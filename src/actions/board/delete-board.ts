"use server";

import { prismadb } from "@/lib/db";
import { ActionResponse } from "@/schemas/action-resp";
import { createActivity } from "../activity/create-activity";
import { deleteColumn } from "../col/delete-col";

export const deleteBoard = async ({
  boardId,
}: {
  boardId: string;
}): Promise<ActionResponse> => {
  try {
    // 1- delete board columns
    const resp = await deleteBoardColumns({ boardId });

    if (resp?.error) {
      return resp;
    }

    const deletedBoard = await prismadb.board.delete({
      where: {
        id: boardId,
      },
    });
    // create new act
    await createActivity({
      workspaceId: deletedBoard.workspaceId,
      content: `deleted board "${deletedBoard.title}"`,
    });

    return { error: false, details: null };
  } catch (error) {
    console.log({ error });
    return { error: true, details: "something went wrong" };
  }
};

export const deleteBoardColumns = async ({
  boardId,
}: {
  boardId: string;
}): Promise<ActionResponse> => {
  try {
    // check if board exists
    const board = await prismadb.board.findFirst({
      where: {
        id: boardId,
      },
      select: {
        columns: true,
      },
    });
    if (!board) {
      return { error: true, details: "Board not found " };
    }

    await Promise.all(
      board.columns.map((col) => {
        return deleteColumn({ colId: col.id, withActivity: false });
      })
    );
    return { error: false, details: board };
  } catch (error) {
    console.log({ error });
    return { error: true, details: "something went wrong" };
  }
};
