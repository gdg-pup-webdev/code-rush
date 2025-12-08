import { adminDb } from "@/lib/firebaseAdmin";
import {
  CreateLeaderboardEntryDTO,
  Leaderboard,
} from "@/types/leaderboardTypes";
import { FieldValue } from "firebase-admin/firestore";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const leaderboardEntryDTO = (await req.json()) as CreateLeaderboardEntryDTO;

    const ref = adminDb.collection("leaderboards").doc("leaderboard");

    const newEntry = {
      ...leaderboardEntryDTO,
      date: Date.now(),
      id: crypto.randomUUID(),
    };

    await ref.update({
      entries: FieldValue.arrayUnion(newEntry),
    });

    return NextResponse.json(
      { message: "Entry created successfully" },
      { status: 200 }
    );
  } catch (err: unknown) {
    console.log(err);
    if (err instanceof Error && err.message.includes("NOT_FOUND")) {
      const ref = adminDb.collection("leaderboards").doc("leaderboard");
      const newEntry = {
        ...leaderboardEntryDTO,
        date: Date.now(),
        id: crypto.randomUUID(),
      };
      await ref.set({ entries: [newEntry] });
      return NextResponse.json(
        { message: "Entry created successfully" },
        { status: 200 }
      );
    }
    return NextResponse.json(
      { error: "Failed to create message" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    // get current leaderboard
    const ref = adminDb.collection("leaderboards").doc("leaderboard");
    const snap = await ref.get();

    let leaderboard: Leaderboard = {
      entries: [],
    };

    if (snap.exists) {
      leaderboard = snap.data() as Leaderboard;
    } else {
      // create new leaderboard in firestore
      await ref.set({ entries: [] });
    }

    const sortedEntries = leaderboard.entries.sort((a, b) => b.score - a.score);

    // return response
    return NextResponse.json(sortedEntries, { status: 200 });
  } catch (err: unknown) {
    return NextResponse.json(
      { error: "Failed to get message" },
      { status: 500 }
    );
  }
}
