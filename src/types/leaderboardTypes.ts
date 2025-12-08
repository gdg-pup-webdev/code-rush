import {
  CreateLeaderboardEntryDTOSchema,
} from "@/schemas/leaderboardSchemas";
import { z } from "zod";

export type CreateLeaderboardEntryDTO = z.infer<
  typeof CreateLeaderboardEntryDTOSchema
>;
export type LeaderBoardEntry = {
  username: string;
  score: number;
  id: string;
  date: number;
};
export type Leaderboard = {
  entries: LeaderBoardEntry[];
};
