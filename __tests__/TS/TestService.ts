import { IServices } from '../../src/TS/Interfaces';
import  Test  from './Models/Test'

export default class TestService implements IServices<Test> {
    store(data: any): Test {
        return {
            id: 5,
            name: "sfsdf",
            year: 5580
        };
    }

    delete(id: any): boolean {
        return false;
    }

    update(id: any, data: any): Test {
        return undefined;
    }
}
