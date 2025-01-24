import express from 'express';
import { createPerson, deletePerson, getAllPersons, getPerson, updatePerson } from '../controllers/personController.js';


const router = express.Router();

// Get All Persons
router.get('/', getAllPersons);

// Get single persons
router.get('/:id', getPerson);

// Create new Person
router.post('/', createPerson);

// Update person
router.put('/:id',updatePerson);

// Delete person
router.delete('/:id', deletePerson);

export default router;
