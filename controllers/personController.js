import { JAVASCRIPT_UNDEFINED } from "../constants.js";
import Person from "../person-schema.js";

// @desc Get all persons
// @route GET/api/persons
export const getAllPersons = async (req, res, next) => {
    const limit = parseInt(req.query.limit);

    if (!isNaN(limit) && limit > 0) {
        return res.status(200).json(await Person.find().limit(limit));
      }
    
      res.status(200).json(await Person.find());
}

// @desc    Get single person
// @route   GET /api/persons/:id
export const getPerson = async (req, res, next) => {
    const id = parseInt(req.params.id);
    const person = await Person.find({id:id});
  
    if (!person) {
      const error = new Error(`A person with the id of ${id} was not found`);
      error.status = 404;
      return next(error);
    }
  
    res.status(200).json(person);
  };
  
  // @desc    Create new person
  // @route   POST /api/persons
  export const createPerson = async (req, res, next) => {
    //TODO: Create other way to create ids rather than incrementing it to the length.
    const fetchedList = await Person.find();
    const newPerson = new Person({
      id: fetchedList.length + 1,
      name: req.body.name,
      age:req.body.age
    });

    if (!newPerson.name) {
      const error = new Error(`Please include a name`);
      error.status = 400;
      return next(error);
    }
  
    await newPerson.save();
    res.status(201).json(await Person.find())

  };
  
  // @desc    Update person
  // @route   PUT /api/persons/:id
  export const updatePerson = async (req, res, next) => {
    const id = parseInt(req.params.id);
    const person = await Person.find({id:id});
  
    if (!person) {
      const error = new Error(`A person with the id of ${id} was not found`);
      error.status = 404;
      return next(error);
    }

    // TODO: Create null coalesce for setting the values.
    await Person.updateOne(
      { id:id },
      {
        $set:{
          name:req.body.name === JAVASCRIPT_UNDEFINED ? person.name : req.body.name,
          age:req.body.age === JAVASCRIPT_UNDEFINED ? person.age : req.body.age
        }
      }
    );


    res.status(200).json(await Person.find());
  };
  
  // @desc    Delete person
  // @route   DELETE /api/persons/:id
  export const deletePerson = async (req, res, next) => {
    const id = parseInt(req.params.id);
    const person = await Person.find({id:id});
  
    if (!person) {
      const error = new Error(`A post with the id of ${id} was not found`);
      error.status = 404;
      return next(error);
    }
  
    await Person.deleteOne({id:id});
    res.status(200).json(await Person.find());
  };