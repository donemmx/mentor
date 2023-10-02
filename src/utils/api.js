import Directual from 'directual-api';
const api = new Directual({apiHost: '/'});

const login = async (username, password) =>  await api.auth.login(username, password);

const logout = async (payload) =>  await api.auth.logout(payload);

const getPricing = async () => await api.structure('tariff').getData('getTarif');

const getProvinces = async () => await api.structure('provinces').getData('getProvince');

const getWorkspace = async (payload) => await api.structure('workspace').getData('ownerWorkspaseListing', payload);

const ownerWorkspaseEdit = async (payload) => await api.structure('workspace').getData('ownerWorkspaseEdit', payload);
 
const getUserWorkspace = async (payload) => await api.structure('workspace').getData('getUserWorkspaceById', payload);

const createWorkspaceWithPayment = async (payload) => await api.structure('_workcpaseAction').setData('createWorkspaceWithPayment', payload)

const editRequestWorkspaceUser = async (payload) => await api.structure('_workcpaseAction').setData('editRequestWorkspaceUser', payload)

const createWorkspaceUser = async (payload) => await api.structure('_workcpaseAction').setData('createWorkspaceUser', payload)

const getProfile = async (payload) => await api.structure('WebUser').getData('profile', payload);

const requestWorkspace = async (payload) => await api.structure('requestWorkspace').getData('myRequstToWorkspace', payload);

const manageRequstByWorkspace = async (payload) => await api.structure('requestWorkspace').getData('manageRequstByWorkspace', payload);

const newRequestToWorkspace = async (payload) => await api.structure('_workcpaseAction').getData('newRequestToWorkspace', payload);

const getInvoiceByWorkspace = async (payload) => await api.structure('invoice').getData('getInvoiceByWorkspace', payload);

const getMentorsByWorkspaceId = async (payload) => await api.structure('userByworkSpace').getData('getMentorsByWorkspaceId_N', payload);

const getMenteesByWorkspaceId = async (payload) => await api.structure('userByworkSpace').getData('getMenteesByWorkspaceId2', payload);

// Mentees 
const getMenteeProfile = async (payload) => await api.structure('WebUser').getData('getMenteeProfile', payload);

export {
    login,
    logout,
    getPricing,
    getProvinces,
    createWorkspaceWithPayment,
    editRequestWorkspaceUser,
    getWorkspace,
    getProfile,
    getUserWorkspace,
    createWorkspaceUser,
    requestWorkspace,
    newRequestToWorkspace,
    manageRequstByWorkspace,
    getMentorsByWorkspaceId,
    getMenteesByWorkspaceId,
    ownerWorkspaseEdit,
    getInvoiceByWorkspace,
    getMenteeProfile,
}