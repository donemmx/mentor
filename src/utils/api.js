
import Directual from 'directual-api';
const api = new Directual({apiHost: '/'});

const login = async (username, password) =>  await api.auth.login(username, password);

const logout = async (payload) =>  await api.auth.logout(payload);

const resetPassword = async (payload) => await api.structure('reset_password_inputs').setData('resetPassword', payload)

const requestPasswordChange = async (payload) => await api.structure('ResetPasswordRequest').setData('requestPasswordChange', payload)

const getPricing = async () => await api.structure('tariff').getData('getTarif');

const getProvinces = async () => await api.structure('provinces').getData('getProvince');

const getWorkspace = async (payload) => await api.structure('workspace').getData('ownerWorkspaseListing', payload);

const ownerWorkspaceEdit = async (payload) => await api.structure('workspace').setData('ownerWorkspaceEdit', payload);
 
const getUserWorkspace = async (payload) => await api.structure('workspace').getData('getUserWorkspaceById', payload);

const createWorkspaceWithPayment = async (payload) => await api.structure('_workcpaseAction').setData('createWorkspaceWithPayment', payload)

const editRequestWorkspaceUser = async (payload) => await api.structure('_workcpaseAction').setData('editRequestWorkspaceUser', payload)

const createWorkspaceUser = async (payload) => await api.structure('_workcpaseAction').setData('createWorkspaceUser', payload)

const getProfile = async (payload) => await api.structure('WebUser').getData('profile', payload);

const requestWorkspace = async (payload) => await api.structure('requestWorkspace').getData('myRequstToWorkspace', payload);

const manageRequstByWorkspace = async (payload) => await api.structure('requestWorkspace').getData('manageRequstByWorkspace', payload);

const newRequestToWorkspace = async (payload) => await api.structure('_workcpaseAction').getData('newRequestToWorkspace', payload);

const getInvoiceByWorkspace = async (payload) => await api.structure('invoice').getData('getInvoiceByWorkspace', payload);

const getMentorsByWorkspaceId = async (payload) => await api.structure('userByworkSpace').getData('getMentorsByWorkspaceId', payload);

const getMenteesByWorkspaceId = async (payload) => await api.structure('userByworkSpace').getData('getMenteesByWorkspaceId', payload);

// Mentees 
const getMenteeProfile = async (payload) => await api.structure('WebUser').getData('getMenteeProfile', payload);

const banUser = async (payload) => await api.structure('userByworkSpace').setData('banUser', payload);

// Mentees 
const getProfAreasByWorkSpace = async (payload) => await api.structure('professional_areas').getData('profAreasByWorkSpace', payload);

export {
    login,
    logout,
    resetPassword,
    requestPasswordChange,
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
    ownerWorkspaceEdit,
    getInvoiceByWorkspace,
    getMenteeProfile,
    banUser,
    getProfAreasByWorkSpace,
}