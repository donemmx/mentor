import Directual from 'directual-api';
const api = new Directual({apiHost: '/'});

const login = async (username, password) =>  await api.auth.login(username, password)

const logout = async (payload) =>  await api.auth.logout(payload)

const getPricing = async () => await api.structure('tariff').getData('getTarif');

const getProvinces = async () => await api.structure('provinces').getData('getProvince');

const createWorkspaceWithPayment = async (payload) => await api.structure('_workcpaseAction').setData('createWorkspaceWithPayment', payload)

export {
    login,
    logout,
    getPricing,
    getProvinces,
    createWorkspaceWithPayment
}