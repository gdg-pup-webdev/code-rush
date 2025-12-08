import {
  CreateLeaderboardEntryDTOSchema,
  LeaderBoardEntrySchema,
  LeaderboardSchema,
} from "@/schemas/leaderboardSchemas";
import { z } from "zod";

export type CreateLeaderboardEntryDTO = z.infer<
  typeof CreateLeaderboardEntryDTOSchema
>;
export type LeaderBoardEntry = z.infer<typeof LeaderBoardEntrySchema>;
export type Leaderboard = z.infer<typeof LeaderboardSchema>;
