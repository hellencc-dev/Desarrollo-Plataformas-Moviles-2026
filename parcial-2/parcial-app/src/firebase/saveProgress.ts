import { doc, setDoc } from "firebase/firestore";
import { db } from "./config";

export async function saveProgressToFirebase(
  uid: string,
  email: string,
  points: number,
  missions: any[]
) {
  await setDoc(doc(db, "progress", uid), {
    email,
    points,
    missions: missions.map((mission) => ({
      id: mission.id,
      completed: mission.completed,
      unlocked: mission.unlocked,
    })),
    updatedAt: new Date().toISOString(),
  });
}