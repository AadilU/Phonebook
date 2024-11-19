import axios from "axios";

const url = "/api/persons";

const getAll = () => {
    return axios.get(url)
}

const addPerson = (enteredName, enteredNumber) => {
    return axios.post(url, {name: enteredName, number: enteredNumber})
}

export default {getAll, addPerson};