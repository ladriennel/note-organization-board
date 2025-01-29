'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

const WorkspaceHomePage = () => {

    const [workspaces, setWorkspaces] = useState([])
    const [selectedWorkspace, setSelectedWorkspace] = useState(null)
    const [errors, setErrors] = useState({})
    
    const router = useRouter()

}