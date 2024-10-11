import { createClient } from "@/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest, { params }: { params: { id: string } }) => {
  const supabase = createClient();

  try {
    const { data, error } = await supabase
      .from("usersPet")
      .select("*")
      .eq("users_id", params.id)
      .in("majorClass", ["강아지", "개"]);

    if (error) {
      console.error(error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "반려견 데이터를 가져오는 데 실패했습니다." }, { status: 500 });
  }
};
