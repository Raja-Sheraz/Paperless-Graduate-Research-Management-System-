import {
    HiOutlineViewGrid,
    HiOutlineCube,
    HiOutlineShoppingCart,
    HiOutlineUsers,
    HiOutlineDocumentText,
    HiOutlineAnnotation,
    HiOutlineQuestionMarkCircle,
    HiOutlineCog
} from 'react-icons/hi'

export const DASHBOARD_SIDEBAR_LINKS_ADMIN = [
    {
        key: 'dashboard',
        label: 'Dashboard',
        path: '/',
        icon: <HiOutlineViewGrid />
    },
    {
        key: 'profile',
        label: 'Profile',
        path: '/profile',
        icon: <HiOutlineCube />
    },
    {
        key: 'proposal',
        label: 'Proposal Submission',
        path: '/proposal',
        icon: <HiOutlineDocumentText />
    },
    {
        key: 'supervisor',
        label: 'SupeVisor',
        path: '/supervisor',
        icon: <HiOutlineUsers />
    },

    {
        key: 'student',
        label: 'Students',
        path: '/students',
        icon: <HiOutlineUsers />
    }
]
export const DASHBOARD_SIDEBAR_LINKS_TEACHER = [
    {
        key: 'dashboard',
        label: 'Dashboard',
        path: '/',
        icon: <HiOutlineViewGrid />
    },
    {
        key: 'profile',
        label: 'Profile',
        path: '/profile',
        icon: <HiOutlineCube />
    },

    {
        key: 'student',
        label: 'Students',
        path: '/students',
        icon: <HiOutlineUsers />
    },

    {
        key: ' settings',
        label: 'Setting',
        path: '/settings',
        icon: <HiOutlineUsers />
    }
]
export const DASHBOARD_SIDEBAR_LINKS_STUDENT = [
    {
        key: 'dashboard',
        label: 'Dashboard',
        path: '/',
        icon: <HiOutlineViewGrid />
    },
    {
        key: 'profile',
        label: 'Profile',
        path: '/profile',
        icon: <HiOutlineCube />
    },
    {
        key: 'proposal',
        label: 'Proposal Submission',
        path: '/proposal',
        icon: <HiOutlineDocumentText />
    },

    {
        key: 'comments',
        label: 'Comments',
        path: '/comments',
        icon: <HiOutlineUsers />
    },
    {
        key: 'applicaionform',
        label: 'Application Form',
        path: '/application-form',
        icon: <HiOutlineUsers />
    },
    {
        key: 'templates',
        label: 'Templates',
        path: '/templates',
        icon: <HiOutlineDocumentText />
    },
    {
        key: ' settings',
        label: 'Setting',
        path: '/settings',
        icon: <HiOutlineUsers />
    }
]
export const DASHBOARD_SIDEBAR_BOTTOM_LINKS = [
    {
        key: 'settings',
        label: 'Settings',
        path: '/settings',
        icon: <HiOutlineCog />
    },
    {
        key: 'support',
        label: 'Help & Support',
        path: '/support',
        icon: <HiOutlineQuestionMarkCircle />
    }
]
