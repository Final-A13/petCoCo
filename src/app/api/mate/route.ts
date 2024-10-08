import { createClient } from "@/supabase/server";
import { NextRequest, NextResponse } from "next/server";
import { MateNextPostType, UsersPetType } from "@/types/mate.type";
import { UserType } from "@/types/auth.type";
import { getTimeRange } from "@/app/(public)/mate/getTimeRange";

export type CreateMatePostWithPetsData = {
  post_data: MateNextPostType;
};

export const GET = async (request: NextRequest) => {
  const supabase = createClient();

  const { searchParams } = request.nextUrl;
  const search = searchParams.get("search");
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "8");
  const filter = Object.fromEntries(searchParams.entries());
  const userLat = parseFloat(searchParams.get("userLat") || "0");
  const userLng = parseFloat(searchParams.get("userLng") || "0");

  try {
    // RPC 호출
    const { data: posts = [], error } = await supabase.rpc("get_mate_posts_with_distance", {
      lat: userLat,
      lng: userLng
    });

    if (error) {
      console.error("RPC Error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // posts가 null일 경우 빈 배열로 초기화
    let validPosts = posts || [];
    // console.log(validPosts)

    // 검색
    if (search) {
      validPosts = validPosts.filter(
        (post) =>
          post.content.toLowerCase().includes(search.toLowerCase()) ||
          post.title.toLowerCase().includes(search.toLowerCase()) ||
          post.place_name.toLowerCase().includes(search.toLowerCase()) ||
          (post.users && post.users?.nickname?.toLowerCase().includes(search.toLowerCase()))
      );
    }

    // 정렬 조건 적용
    if (filter.sort === "recruitment_end") {
      validPosts = validPosts.filter((post) => {
        return new Date(post.date_time).getTime() >= new Date().getTime() + 2 * 60 * 60 * 1000; // 모집 기간 : 산책 시간까지 2시간 이내로 남았을 경우 보여주지 않음
      });

      validPosts = validPosts
        .filter((post) => post.recruiting)
        .sort((a, b) => new Date(a.date_time).getTime() - new Date(b.date_time).getTime());
    } else if (filter.sort === "new") {
      validPosts = validPosts
        .filter((post) => post.recruiting)
        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    } else if (filter.sort === "distance" || filter.sort === "recruiting") {
      validPosts = validPosts.filter((post) => post.recruiting).sort((a, b) => (a.distance || 0) - (b.distance || 0));
    } else if (filter.sort === "all") {
      validPosts = validPosts.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    }

    // 게시글 필터링
    if (filter.gender && filter.gender !== "전체") {
      validPosts = validPosts.filter((post) => {
        if (Array.isArray(post.users)) {
          return (post.users as UserType[]).some((pet) => pet.gender === filter.gender);
        }
        return false;
      });
    }

    if (filter.age && filter.age !== "전체") {
      validPosts = validPosts.filter((post) => {
        if (Array.isArray(post.users)) {
          return (post.users as UserType[]).some((pet) => pet.age === filter.age);
        }
        return false;
      });
    }

    if (filter.regions && filter.regions !== "전체") {
      const regionPrefix = filter.regions.slice(0, 2);
      validPosts = validPosts.filter((post) => post.address.startsWith(regionPrefix));
    }

    if (filter.date_time) {
      validPosts = validPosts.filter((post) => post.date_time.includes(filter.date_time));
    }

    if (filter.times) {
      validPosts = getTimeRange(validPosts, filter.times);
    }

    // 반려견 필터
    if (filter.weight) {
      const weightValue = parseFloat(filter.weight);
      validPosts = validPosts.filter((post) => {
        if (Array.isArray(post.usersPet)) {
          return (post.usersPet as UsersPetType[]).some(
            (pet) => pet && pet.weight !== null && pet.weight >= weightValue
          );
        }
        return false;
      });
    }

    if (filter.male_female && filter.male_female !== "전체") {
      validPosts = validPosts.filter((post) => {
        if (Array.isArray(post.usersPet)) {
          return (post.usersPet as UsersPetType[]).some((pet) => pet && pet.male_female === filter.male_female);
        }
        return false;
      });
    }

    if (filter.neutralized && filter.neutralized !== "all") {
      validPosts = validPosts.filter((post) => {
        if (Array.isArray(post.usersPet)) {
          return (post.usersPet as UsersPetType[]).some((pet) => pet && pet.neutralized === filter.neutralized);
        }
        return false;
      });
    }

    // 페이지네이션 처리
    const total = validPosts.length;
    const paginatedPosts = validPosts.slice((page - 1) * limit, page * limit);

    return NextResponse.json({
      data: paginatedPosts,
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit)
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
};

export const POST = async (request: NextRequest) => {
  const supabase = createClient();
  const { post_data }: CreateMatePostWithPetsData = await request.json();

  // location 필드에 값 추출에서 추가, 따로 넣어주지 않아도
  const postDataWithLocation = {
    ...post_data,
    location: `POINT(${post_data.position.center.lng} ${post_data.position.center.lat})`
  };

  try {
    const { data, error } = await supabase.from("matePosts").insert(postDataWithLocation);

    if (error) {
      console.error(error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ err }, { status: 500 });
  }
};
