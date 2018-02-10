const dpm = new DPM()
const plotMax = 2
const requestRate = '@P,67'
// const devices = ['B:CHG0', 'B:CHG1', 'B:CHG2', 'B:CHGA', 'B:CHGB']
// const devices = [
//     'B:BL0110',
//     'B:BLL010',
//     'B:BLS010',
//     'B:BLL020',
//     'B:BLS020',
//     'B:BLL030',
//     'B:BLS030',
//     'B:BLL040',
//     'B:BLS040',
//     'B:BLL050',
//     'B:BLS050',
//     'B:BLL060',
// 	'B:BLS060',
// 	'B:BLL070',
// 	'B:BLS070',
// 	'B:BLL080',
// 	'B:BLS080',
// 	'B:BLL090',
// 	'B:BLS090',
// 	'B:BLL100',
// 	'B:BLS100',
// 	'B:BLL110',
// 	'B:BLS110',
// 	'B:BLL120',
// 	'B:BLS120',
// 	'B:BLL130',
// 	'B:BLS130',
// 	'B:BL0610',
// 	'B:BL0620',
// 	'B:BL0710',
// 	'B:BL0720',
// 	'B:BLL140',
// 	'B:BLS140',
// 	'B:BLL150',
// 	'B:BLS150',
// 	'B:BLL160',
// 	'B:BLS160',
// 	'B:BLL170',
// 	'B:BLS170',
// 	'B:BLL180',
// 	'B:BLS180',
// 	'B:BLL190',
// 	'B:BLS190',
// 	'B:BLL200',
// 	'B:BLS200',
// 	'B:BLL210',
// 	'B:BLS210',
// 	'B:BLL220',
// 	'B:BLS220',
// 	'B:BLL230',
// 	'B:BLS230',
// 	'B:BLL240',
// 	'B:BLS240',
// 	'B:BL0250',
// 	'B:BL0260',
// 	'B:BL0230',
// 	'B:BL0210',
// 	'B:BL0240'
// ]
const devices = [
    'B:BLM011',
    'B:BLML01',
    'B:BLMS01',
    'B:BLML02',
    'B:BLMS02',
    'B:BLML03',
    'B:BLMS03',
    'B:BLML04',
    'B:BLMS04',
    'B:BLML05',
    'B:BLMS05',
    'B:BLML06',
	'B:BLMS06',
	'B:BLML07',
	'B:BLMS07',
	'B:BLML08',
	'B:BLMS08',
	'B:BLML09',
	'B:BLMS09',
	'B:BLML10',
	'B:BLMS10',
	'B:BLML11',
	'B:BLMS11',
	'B:BLML12',
	'B:BLMS12',
	'B:BLML13',
	'B:BLMS13',
	'B:BLM061',
	'B:BLM062',
	'B:BLM071',
	'B:BLML14',
	'B:BLMS14',
	'B:BLML15',
	'B:BLMS15',
	'B:BLML16',
	'B:BLMS16',
	'B:BLML17',
	'B:BLMS17',
	'B:BLML18',
	'B:BLMS18',
	'B:BLML19',
	'B:BLMS19',
	'B:BLML20',
	'B:BLMS20',
	'B:BLML21',
	'B:BLMS21',
	'B:BLML22',
	'B:BLMS22',
	'B:BLML23',
	'B:BLMS23',
	'B:BLML24',
	'B:BLMS24',
	'B:BLM025',
	'B:BLM026',
	'B:BLM023',
	'B:BLM021',
	'B:BLM024'
]
const container = document.querySelector('#container')

function barTemplate(device, unique) {
    return `<div class="bar" id="${unique}">
    <label for="${unique}">${device}</label>
</div>`
}

function deviceToId(deviceName) {
    return deviceName.slice(2)
}

function textToNode(text) {
    return document.createRange().createContextualFragment(text)
}

function listToHtml(devices, parent) {
    for (const device of devices) {
        parent.append(textToNode(barTemplate(device, deviceToId(device))))
    }
}

function updateBar(bar) {
    return (data, info) => {
        if (data.data <= 0) data.data = 0
        const container = bar.parentNode
        const parentHeight = container.clientHeight
        const height = data.data * (parentHeight / plotMax)
        bar.style.height = `${height}px`
    }
}

function listToRequests(list) {
    for (const item of list) {
        dpm.addRequest(`${item}${requestRate}`, updateBar(container.querySelector(`#${deviceToId(item)}`)))
    }
}

listToHtml(devices, container)
listToRequests(devices)

dpm.start()