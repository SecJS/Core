import { IRepository } from "../../src/TS/Interfaces";
import Test from "./Models/Test";

export default class TestRepository implements IRepository<Test> {
    all(): Test[] {
        return [
            {
                id: 5,
                name: "sfsdf",
                year: 555
            },
            {
                id: 4,
                name: "aaaa",
                year: 555
            }
        ];
    }

    find(id: any): Test {
        return {
            id,
            name: "sfsdf",
            year: 555
        };
    }

    other(): void {

    }
}
