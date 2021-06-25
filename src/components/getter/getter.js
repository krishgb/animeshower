import axios from 'axios'

async function get(url, end) {
    try {
        const res = await axios.get(url + end)
        const getting = await res.data
        const [data, count] = [await getting.data, await getting.meta.count]
        return { data, count }
    } catch (err) {
        alert(err)
    }
}

export { get }