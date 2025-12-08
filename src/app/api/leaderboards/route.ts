import { db } from "@/lib/firebase";
import {
  CreateLeaderboardEntryDTO,
  Leaderboard,
} from "@/types/leaderboardTypes";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const leaderboardEntryDTO = (await req.json()) as CreateLeaderboardEntryDTO;

    // get current leaderboard
    const ref = doc(db, "leaderboards", "leaderboard");
    const snap = await getDoc(ref);

    let leaderboard: Leaderboard = {
      entries: [],
    };

    if (snap.exists()) {
      leaderboard = snap.data() as Leaderboard;
    }

    // add new entry to leaderboard
    leaderboard.entries.push({
      ...leaderboardEntryDTO,
      date: Date.now(),
      id: crypto.randomUUID(),
    });

    // update leaderboard in firestore
    await setDoc(ref, leaderboard);

    // return response
    return NextResponse.json(
      { message: "Entry created successfully" },
      { status: 200 }
    );
  } catch (err: unknown) {
    console.log(err);
    return NextResponse.json(
      { error: "Failed to create message" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    // get current leaderboard
    const ref = doc(db, "leaderboards", "leaderboard");
    const snap = await getDoc(ref);

    let leaderboard: Leaderboard = {
      entries: [],
    };

    if (snap.exists()) {
      leaderboard = snap.data() as Leaderboard;
    } else {
      // create new leaderboard in firestore
      await setDoc(ref, { leaderboard });
    }

    // return response
    return NextResponse.json(
      {
        message: "Success",
        data: {
          leaderboard: leaderboard,
        },
      },
      { status: 200 }
    );
  } catch (err: unknown) {
    return NextResponse.json(
      { error: "Failed to create message" },
      { status: 500 }
    );
  }
}
