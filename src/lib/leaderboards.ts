export const postLeaderBoardEntry = async (name: string, score: number) => {
  const res = await fetch("/api/leaderboards", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      score: score,
    }),
  });

  if (!res.ok) {
    throw new Error("Failed to create message");
  }

  return res.json();
};

export const getLeaderboards = async () => {
  const res = await fetch("/api/leaderboards");

  if (!res.ok) {
    throw new Error("Failed to get leaderboards");
  }

  return await res.json();
};
