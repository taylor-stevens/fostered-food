export interface test {

    name: string;
    address: string;
    lastOpen: string;
    temperature: number;
    contact: string[];
    posts: any[];

    getName(): string;
    getAddress(): string;
    getLastOpen(): string;
    getTemperature(): string;
    getContact(): string[];
    getPosts(): any[];
}

class x implements test {
    field1: string= "";

    method1(): string {
        return "";
    }

    method2(): void {
    }

}