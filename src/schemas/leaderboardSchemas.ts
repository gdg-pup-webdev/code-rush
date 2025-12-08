import { z } from "zod";

export const CreateLeaderboardEntryDTOSchema = z.object({
  username: z.string().min(1, "Name cannot be empty"),
  score: z.number().int().positive("Score must be a positive integer"),
});

export const LeaderBoardEntrySchema = z.object({
  username: z.string().min(1),
  score: z.number().int().positive("Score must be a positive integer"),
  id: z.string("ID must be a valid string"),
  date: z
    .number()
    .int()
    .positive("Date must be a positive integer (timestamp)"),
});

export const LeaderboardSchema = z.array(LeaderBoardEntrySchema);
