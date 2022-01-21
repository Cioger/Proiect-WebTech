import axios from 'axios';

async function get(url, id) {
    try {
        let newUrl = !id ? url : url + "/" + id;
        return (await axios.get(newUrl)).data;
    } catch (e) {
        return e.response.data;
    }
}

async function post(url, item) {
    try {
        return (await axios.post(
            url,
            item,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )).data;
    } catch (e) {
        return e.response.data;
    }
}

async function postProject(url, item) {
    try {
        let newUrl = !item ? url : url + "/add/" + item.teamName;
        return (await axios.post(
            newUrl,
            item,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )).data;
    } catch (e) {
        return e.response.data;
    }
}

async function getProjectsUser(url, id) {
    try {
        let newUrl = !id ? url : url + "/getProjectByIdUser/" + id;
        return (await axios.get(newUrl)).data;
    } catch (e) {
        return e.response.data;
    }
}

async function getProjects(url) {
    try {
        let newUrl = url + "/getProjects";
        return (await axios.get(newUrl)).data;
    } catch (e) {
        return e.response.data;
    }
}

async function getName(url, name) {
    try {
        let newUrl = !name ? url : url + "/user/" + name;
        return (await axios.get(newUrl)).data;
    } catch (e) {
        return e.response.data;
    }
}

async function getProjectByName(url, name) {
    try {
        let newUrl = !name ? url : url + "/getProject/" + name;
        return (await axios.get(newUrl)).data;
    } catch (e) {
        return e.response.data;
    }
}

async function getTeamNameById(url, id) {
    try {
        let newUrl = !id ? url : url + '/' + id;
        return (await axios.get(newUrl)).data;
    } catch (e) {
        return e.response.data;
    }
}

async function updateProject(url, item, location) {
    try {
        let newUrl = !item ? url : url + "/update/" + location;
        return (await axios.put(
            newUrl,
            item,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )).data;
    } catch (e) {
        return e.response.data;
    }
}

async function getBugsProject(url, name) {
    try {
        let newUrl = !name ? url : url + "/getBugProject/" + name;
        return (await axios.get(newUrl)).data;
    } catch (e) {
        return e.response.data;
    }
}

async function getBugs(url) {
    try {
        return (await axios.get(url)).data;
    } catch (e) {
        return e.response.data;
    }
}

async function getBugCommit(url, description) {
    try {
        let newUrl = !description ? url : url + "/" + description;
        return (await axios.get(newUrl)).data;
    } catch (e) {
        return e.response.data;
    }
}

export { get, post, getName, postProject, getProjectsUser, getProjects, getProjectByName, getTeamNameById, updateProject, getBugsProject, getBugs, getBugCommit };