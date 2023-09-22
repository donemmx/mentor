import Directual from 'directual-api';
const api = new Directual({apiHost: '/'});

const login = async (username, password) =>  await api.auth.login(username, password);

const logout = async (payload) =>  await api.auth.logout(payload);

const getPricing = async () => await api.structure('tariff').getData('getTarif');

const getProvinces = async () => await api.structure('provinces').getData('getProvince');

const getWorkspace = async (payload) => await api.structure('workspace').getData('ownerWorkspaseListing', payload);

const getUserWorkspace = async (payload) => await api.structure('workspace').getData('getUserWorkspaceById', payload);

const createWorkspaceWithPayment = async (payload) => await api.structure('_workcpaseAction').setData('createWorkspaceWithPayment', payload)

const createWorkspaceUser = async (payload) => await api.structure('_workcpaseAction').setData('createWorkspaceUser', payload)

const getProfile = async (payload) => await api.structure('WebUser').getData('profile', payload);

export {
    login,
    logout,
    getPricing,
    getProvinces,
    createWorkspaceWithPayment,
    getWorkspace,
    getProfile,
    getUserWorkspace,
    createWorkspaceUser
}