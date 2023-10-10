import React, { useEffect } from 'react'
import { workspaceStore } from '../../atom/workspaceAtom'
import { useRecoilValue } from 'recoil'
import { getProfAreasByWorkSpace } from '../../utils/api'

export default function ProfessionalArea() {

    const workspace = useRecoilValue(workspaceStore)
    console.log(workspace.id, 'the real workspace id')

    const getProfessionalAreas = () => {
        const payload = {
            id : workspace.id
        }
        getProfAreasByWorkSpace(payload).then((res)=>{
            console.log(res, 'the profeesionals areas details')
        })

    }
    // editProfAreaByWorkSpace,
    
    useEffect(()=>{
        getProfessionalAreas()
    })    
    return (
        <div>professionalArea 
        </div>
    )
}
