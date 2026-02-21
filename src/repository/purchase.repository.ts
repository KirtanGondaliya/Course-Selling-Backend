import { db } from "../config";
import CrudRepository from "./crud.repository";

class PurchaseRepository extends CrudRepository{
    constructor(){
        super(db.purchase);
    }
}

export default PurchaseRepository