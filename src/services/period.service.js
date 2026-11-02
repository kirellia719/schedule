import {
    collection,
    doc,
    getDocs,
    setDoc,
    deleteDoc,
    limit,
    query,
    where,
    writeBatch
} from "firebase/firestore";

import { db } from "@/firebase/config";

async function generatePeriodId() {

    const snapshot = await getDocs(
        collection(db, "periods")
    );

    let max = 0;

    snapshot.forEach((item) => {

        const match = item.id.match(/^period_(\d+)$/);

        if (!match) return;

        max = Math.max(
            max,
            Number(match[1])
        );

    });

    return `period_${String(max + 1).padStart(3, "0")}`;

}

export async function getPeriods() {

    const snapshot = await getDocs(
        collection(db, "periods")
    );

    return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
    }));

}

export async function getActivePeriod() {

    const q = query(
        collection(db, "periods"),
        where("active", "==", true),
        limit(1)
    );

    const snapshot = await getDocs(q);

    if (snapshot.empty) {
        return null;
    }

    const doc = snapshot.docs[0];

    return {
        id: doc.id,
        ...doc.data(),
    };
}

export async function createPeriod(period) {

    if (!period.name)
        throw new Error("Thiếu tên Period.");

    if (!period.applyDate)
        throw new Error("Thiếu ngày áp dụng.");

    if (!period.schedule)
        throw new Error("Thiếu schedule.");

    //------------------------------------

    const id = await generatePeriodId();

    //------------------------------------

    await setDoc(
        doc(db, "periods", id),
        {
            name: period.name,
            applyDate: period.applyDate,
            active: period.active,
            schedule: period.schedule,
        }
    );

    return id;

}

export async function deletePeriod(periodId) {

    await deleteDoc(
        doc(db, "periods", periodId)
    );

}

export async function setActivePeriod(periodId) {

    const snapshot = await getDocs(
        collection(db, "periods")
    );

    const current = snapshot.docs.find(doc => doc.id === periodId);

    if (!current) {
        throw new Error("Không tìm thấy Period.");
    }

    // Đã là Period đang áp dụng thì không làm gì (không tự tắt)
    if (current.data().active === true) {
        return;
    }

    const batch = writeBatch(db);

    let changed = 0;

    snapshot.forEach(item => {

        // Bật đúng Period được chọn, tắt mọi Period còn lại
        const active = item.id === periodId;

        if (item.data().active === active) {
            return;
        }

        batch.update(item.ref, {
            active,
        });

        changed += 1;

    });

    if (changed > 0) {
        await batch.commit();
    }
}

export async function getClasses() { }

export async function updatePeriod() { }