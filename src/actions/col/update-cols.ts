"use server";

import { prismadb } from "@/lib/db";
import { ActionResponse } from "@/schemas/action-resp";
import { ColumnWithTasks } from "@/schemas/drag-schemas";

export const swapColsPositions = async ({
  activeCol,
  overCol,
}: {
  activeCol: ColumnWithTasks;
  overCol: ColumnWithTasks;
}): Promise<ActionResponse> => {
  try {
    const activePos = activeCol?.position;
    const overPos = overCol?.position;

    await prismadb.column.update({
      where: {
        id: activeCol?.id!,
      },
      data: {
        position: overPos,
      },
    });

    await prismadb.column.update({
      where: {
        id: overCol?.id!,
      },
      data: {
        position: activePos > overPos ? overPos + 1 : overPos - 1,
      },
    });
    return { error: false, details: "Columns swap successfully" };
  } catch (error) {
    console.log({ error });
    return { error: true, details: "Something went wrong" };
  }
};

export const updateColsPositions = async ({
  newCols,
  boardId,
}: {
  newCols: ColumnWithTasks[];
  boardId: string;
}): Promise<ActionResponse> => {
  try {
    await Promise.all(
      newCols.map((col, index) => {
        console.log(col.title);
        return prismadb.column.update({
          where: {
            id: col?.id,
            boardId,
          },
          data: {
            position: index,
          },
        });
      })
    );

    return { error: false, details: "columns positions updated successfully" };
  } catch (error) {
    console.log({ error });
    return { error: true, details: "something went wrong" };
  }
};
