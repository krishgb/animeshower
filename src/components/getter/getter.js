import axios from 'axios'

async function getAnimes(array, hoc, search = null, limit = []) {
    const url = search ? `https://kitsu.io/api/edge/anime/?filter%5Btext%5D=${search}&page%5Blimit%5D=20&page%5Boffset%5D=` : 'https://kitsu.io/api/edge/anime/?sort=ratingRank&page%5Blimit%5D=20&page%5Boffset%5D='
    try {
        const res = await axios.get(url + 0)
        const getting = await res.data
        const [count, data] = await [getting.meta.count, getting.data]
        limit[0] = count
        array.splice(0, array.length)
        array.push(...data)
        if (limit < 20) {
            hoc(array.slice(0, limit))
            return
        }
        hoc(array.slice(0, 20))
        for (let j = 20; j < count; j += 20) {

            const response = await axios.get(url + j)
            const got = await response.data
            const animeData = await got.data

            await array.push(...animeData)
        }

    } catch (err) {
        if (err) alert(err)
    }
}

export default getAnimes