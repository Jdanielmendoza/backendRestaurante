import { check } from "express-validator";
import {validateResult} from "../helpers/validateHelper.js"
export const validateCreateMesa=[
  check('id').exists().not().isEmpty(),
  (req,res,next)=>{
    validateResult(req,res,next)
  }
]
