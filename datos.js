export const ciudades = [
    {
        id: '1',
        nombre: 'Cali',
        destinos: [{nombre: 'Medellin'}, {nombre:'Bogota'}, {nombre:'Cartagena'}]
    },

    {
        id: '2',
        nombre: 'Medellin',
        destinos: [{nombre: 'Pereira'}, {nombre: 'Bogota'}, {nombre: 'Cartagena'}, {nombre: 'Cali'}]
    },

    {
        id: '3',
        nombre: 'Bogota',
        destinos: [{nombre: 'Pereira'}, {nombre: 'Cali'}, {nombre: 'Cartagena'}, {nombre: 'Medellin'}]
    },

    {
        id: '4',
        nombre: 'Cartagena',
        destinos: [{nombre: 'Cali'}, {nombre: 'Medellin'}, {nombre: 'Bogota'}]
    },

    {
        id: '5',
        nombre: 'Pereira',
        destinos: [{nombre: 'Medellin'}, {nombre: 'Bogota'}]
    },
]

export const vuelos =  [
    {
        destino: 'Bogota',
        duracion: '',
        fecha: '2022-10-14',
        horaSalida: '6:30 AM',
        horaLlegada: '7:30 AM',
        id: 'V1',
        origen: 'Cali',
        tipo: 'Directo',
        valor: '125.000',
    },
    {
        destino: 'Bogota',
        duracion: '',
        fecha: '2022-10-14',
        horaSalida: '2:00 PM',
        horaLlegada: '3:00 PM',
        id: 'V2',
        origen: 'Cali',
        tipo: 'Escala',
        valor: '95.000',
    },
    {
        destino: 'Cali',
        duracion: '',
        fecha: '2022-10-16',
        horaSalida: '',
        horaLlegada: '',
        id: 'V3',
        origen: 'Bogota',
        tipo: 'Directo',
        valor: 0,
    },
    {
        destino: 'Cali',
        duracion: '',
        fecha: '2022-10-10',
        horaSalida: '',
        horaLlegada: '',
        destino: 'Bogota',
        tipo: 'Directo',
        valor: 0,
    },
    {
        destino: '',
        duracion: '',
        fecha: '2022-10-10',
        horaSalida: '',
        horaLlegada: '',
        destino: 'Medellin',
        tipo: 'Directo',
        valor: 0,
    }
]