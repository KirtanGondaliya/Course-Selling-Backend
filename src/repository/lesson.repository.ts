import { db } from "../config";
import CrudRepository from "./crud.repository";

class LessonRepository extends CrudRepository{
    constructor(){
        super(db.lesson)
    }
}

export default LessonRepository