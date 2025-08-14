import { EdiServiceSoap } from "../ports/EdiServiceSoap";
import { EdiServiceSoap12 } from "../ports/EdiServiceSoap12";

export interface EdiService {
    readonly EdiServiceSoap: EdiServiceSoap;
    readonly EdiServiceSoap12: EdiServiceSoap12;
}
