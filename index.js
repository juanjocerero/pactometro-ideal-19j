const container = document.getElementById('pactos')

const baseData = [
  { elecciones: 'and', Partido: 'PSOE', Escaños: 32, color: '#e1251a', checkId: 'psoeId' },
  { elecciones: 'and', Partido: 'PP', Escaños: 48, color: '#0262b6', checkId: 'ppId' },
  { elecciones: 'and', Partido: 'Vox', Escaños: 18, color: '#5ac035', checkId: 'voxId' },
  { elecciones: 'and', Partido: 'Por Andalucía', Escaños: 7, color: '#762077', checkId: 'porId' },
  { elecciones: 'and', Partido: 'Adelante Andalucía', Escaños: 3, color: '#28ca7e', checkId: 'adelanteId' },
  { elecciones: 'and', Partido: 'Ciudadanos', Escaños: 1, color: '#ff5001', checkId: 'csId' },
  { elecciones: 'and', Partido: 'Resto', Escaños: 0, color: '#748d9a', checkId: 'restoId' }
]

const data = []

const checkboxes = document.getElementsByTagName('input')
const labels = document.getElementsByTagName('label')

_.each(labels, label => {
  console.log(label.htmlFor)

  let resultado = _.first(baseData.filter(e => e.checkId === label.htmlFor))
  label.innerHTML += ` (${resultado['Escaños']})`
})

_.each(checkboxes, checkbox => {
  checkbox.addEventListener('change', event => {
    let id = event.target.id
    let dataElement = _.first(baseData.filter(e => e.checkId === id))

    if (event.target.checked) {
      data.push(dataElement)
    } else {
      data.splice(data.findIndex(item => item.checkId === id), 1)
    }

    if (data.length) {
      const chart = new Taucharts.Chart({
        type: 'horizontal-stacked-bar',
        y: 'elecciones',
        x: 'Escaños',
        color: 'color',
        data: data,
        plugins: [
          Taucharts.api.plugins.get('tooltip')({ fields: ['Partido', 'Escaños'] }),
          Taucharts.api.plugins.get('annotations')({
            items: [
              { dim: 'Escaños', val: 55, text: 'Mayoría absoluta (55)', color: '#748d9a' }
            ]
          }),
        ],
        guide: {
          color: {
            brewer: data.map(e => e.color)
          },
          showGridLines: '',
          y: { hide: true },
          x: { hide: true }
        },
        settings: {
          fitModel: 'entire-view'
        }
      })
  
      container.innerHTML = ''
      chart.renderTo(container)
    } else {
      container.innerHTML = `
        <div class="row text-center">
        <div class="col">
        <h6 class="mb-3" style="color:#d50019">No hay datos seleccionados</h6>
        <p style="margin: 0 3rem; font-weight: 400">Marque las casillas de los partidos para ver posibles combinaciones</p>
        </div>
        </div>
      `
    }

  })
})
