import {Text} from 'react-native'
import DespesaSaida from '../components/despesa/DespesaSaida'
function TodasDespesas(){

    const DUMMY_DESPESAS = [
        {
            id: '1',
            descricao: 'Conta de luz',
            valor: 100.99,
            data: new Date(2026, 3, 25)
        },
        {
            id: '2',
            descricao: 'Conta de Água',
            valor: 40.99,
            data: new Date(2026, 2, 25)
        }
    ]

    return (
        <DespesaSaida despesas={DUMMY_DESPESAS} periodo={'Total'}/>
    )

}

export default TodasDespesas