import axios from 'axios'

const BASE = 'https://kitsu.io/api/edge/anime/'

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

async function getProducer(id, hof) {
    try {
        const studioRequest1 = await axios.get(`${BASE}${id}/anime-productions`)
        const studioResponse = await studioRequest1.data
        const { data } = await studioResponse

        if (!data.length) return

        let studiolink = ''
        for (let i of data) {
            if (i.attributes.role === 'studio') {
                studiolink = i?.relationships?.producer?.links?.related
            }
        }

        // studio
        const studioRequest2 = await axios.get(studiolink)
        const studios = await studioRequest2.data

        hof(prev => {
            return {
                ...prev,
                studio: studios?.data?.attributes?.name,
            }
        })
    } catch (err) {
        console.log("STUDIO", err)
    }
}

async function getGenres(id, hof) {
    try {

        const request = await axios.get(`${BASE}${id}/genres`)
        const response = await request.data
        const { data } = await response

        if (!data.length) return
        let genres = ''

        for (let genre of data) {
            genres += genre?.attributes?.name + '  '
        }

        hof(prev => {
            return {
                ...prev,
                genres: genres.trim().split('  ').join(', ')
            }
        })
    } catch (err) {
        console.log("GENRES", err)
        alert(err)
    }
}


async function characters(data, object) {
    try {
        for (let i of data) {
            if (i.attributes.role === 'main') {
                const $ = await (await axios.get(i?.relationships?.character?.links?.related)).data
                const { attributes } = await $.data
                const characterName = attributes?.canonicalName
                const characterImg = attributes?.image?.original
                object[characterName] = characterImg
            }
        }
    } catch (err) { console.log('MC', err); alert(err) }
}

async function getMainCharacters(id, hof) {
    const url = `${BASE}${id}/characters?page%5Blimit%5D=20&page%5Boffset%5D=`
    try {
        const request = await axios.get(`${url}0`)
        const response = await request.data
        const [resData, count] = [await response.data, await response.meta.count]

        if (!resData.length) return

        const mainCharacters = {}
        await characters(resData, mainCharacters)

        for (let j = 20; j < count; j += 20) {
            const { data } = await (await axios.get(url + j)).data
            if (!data.length) return

            await characters(data, mainCharacters)
            // for (let k of data) {
            //     // if (k.attributes.role === 'main') {
            //         await characters(data, mainCharacters)
            //     // }
            // }
        }

        hof(prev => {
            return {
                ...prev,
                mainCharacters
            }
        })

    } catch (err) {
        console.log("MAIN", err)
        alert(err)
    }
}
export { get, getProducer, getGenres, getMainCharacters }