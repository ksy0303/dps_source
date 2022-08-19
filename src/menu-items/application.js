// third-party
//import { FormattedMessage } from 'react-intl';

// assets
import { IconUserCheck, IconBasket, IconMessages, IconLayoutKanban, IconMail, IconCalendar, IconNfc } from '@tabler/icons';

// constant
const icons = {
    IconUserCheck,
    IconBasket,
    IconMessages,
    IconLayoutKanban,
    IconMail,
    IconCalendar,
    IconNfc
};

// ==============================|| APPLICATION MENU ITEMS ||============================== //

const application = {
    id: 'application',
    title: 'Application',
    type: 'group',
    children: [
        {
            id: 'menu01',
            title: '계획수립',
            type: 'collapse',
            icon: icons.IconUserCheck,
            children: [
                {
                    id: 'account-profile',
                    title: 'In-Season',
                    type: 'collapse',
                    children: [
                        {
                            id: 'profile1',
                            title:'월별매출예상',
                            type: 'item',
                            url: '/customer/product'
                        },
                        {
                            id: 'profile2',
                            title: 'ACC브랜드판매계획',
                            type: 'item',
                            url: '/user/account-profile/profile2'
                        }
                    ]
                }
            ]
        },
        {
            id: 'menu02',
            title: 'In-Season 영업활동',
            type: 'collapse',
            icon: icons.IconBasket,
            children: [
                {
                    id: 'account-profile',
                    title: '영업QR',
                    type: 'collapse',
                    children: [
                        {
                            id: 'profile3',
                            title:'영업QR 요청',
                            type: 'item',
                            url: '/user/account-profile/profile1'
                        },
                        {
                            id: 'profile4',
                            title: '영업QR 요청 진행현황',
                            type: 'item',
                            url: '/user/account-profile/profile2'
                        }
                    ]
                }, 
                {
                    id: 'account-profile',
                    title: '이월조치',
                    type: 'collapse',
                    children: [
                        {
                            id: 'profile5',
                            title:'영업QR 요청',
                            type: 'item',
                            url: '/user/account-profile/profile1'
                        },
                        {
                            id: 'profile6',
                            title: '영업QR 요청 진행현황',
                            type: 'item',
                            url: '/user/account-profile/profile2'
                        }
                    ]
                },                 
                {
                    id: 'account-profile',
                    title: '온라인 Alert',
                    type: 'collapse',
                    children: [
                        {
                            id: 'profile7',
                            title:'영업QR 요청',
                            type: 'item',
                            url: '/user/account-profile/profile1'
                        },
                        {
                            id: 'profile8',
                            title: '영업QR 요청 진행현황',
                            type: 'item',
                            url: '/user/account-profile/profile2'
                        }
                    ]
                },   
                {
                    id: 'account-profile',
                    title: '온라인 Report',
                    type: 'collapse',
                    children: [
                        {
                            id: 'profile9',
                            title:'LF MALL 품절 상품 LIST ',
                            type: 'item',
                            url: '/views/online-report/onlineSapStockCntNList'
                        },
                        {
                            id: 'profile10',
                            title: '온라인 라이브율 관리',
                            type: 'item',
                            url: '/views/online-report/onlineLiveRatioMgr'
                        }
                    ]
                },    
                {
                    id: 'account-profile',
                    title: '물량이동',
                    type: 'collapse',
                    children: [
                        {
                            id: 'profile11',
                            title:'영업QR 요청',
                            type: 'item',
                            url: '/user/account-profile/profile1'
                        },
                        {
                            id: 'profile12',
                            title: '영업QR 요청 진행현황',
                            type: 'item',
                            url: '/user/account-profile/profile2'
                        }
                    ]
                },         
                {
                    id: 'account-profile',
                    title: '물량이동 Report',
                    type: 'collapse',
                    children: [
                        {
                            id: 'profile13',
                            title:'영업QR 요청',
                            type: 'item',
                            url: '/user/account-profile/profile1'
                        },
                        {
                            id: 'profile14',
                            title: '영업QR 요청 진행현황',
                            type: 'item',
                            url: '/user/account-profile/profile2'
                        }
                    ]
                },       
                {
                    id: 'account-profile',
                    title: '예약판매 자동RT',
                    type: 'collapse',
                    children: [
                        {
                            id: 'profile15',
                            title:'영업QR 요청',
                            type: 'item',
                            url: '/user/account-profile/profile1'
                        },
                        {
                            id: 'profile16',
                            title: '영업QR 요청 진행현황',
                            type: 'item',
                            url: '/user/account-profile/profile2'
                        }
                    ]
                },         
                {
                    id: 'account-profile',
                    title: '글로벌휴먼스 사용자권한',
                    type: 'collapse',
                    children: [
                        {
                            id: 'profile17',
                            title:'영업QR 요청',
                            type: 'item',
                            url: '/user/account-profile/profile1'
                        },
                        {
                            id: 'profile18',
                            title: '영업QR 요청 진행현황',
                            type: 'item',
                            url: '/user/account-profile/profile2'
                        }
                    ]
                },                                                                                                 
            ]
        },
        {
            id: 'menu03',
            title: 'ADMIN',
            type: 'collapse',
            icon: icons.IconUserCheck,
            children: [
                {
                    id: 'account-profile',
                    title: 'USER',
                    type: 'collapse',
                    children: [
                        {
                            id: 'profile19',
                            title:'USER관리',
                            type: 'item',
                            url: '/user/account-profile/profile1'
                        },
                        {
                            id: 'profile20',
                            title: 'ACC브랜드판매계획',
                            type: 'item',
                            url: '/user/account-profile/profile2'
                        }
                    ]
                }, 
                {
                    id: 'account-profile',
                    title: 'MASTER',
                    type: 'collapse',
                    children: [
                        {
                            id: 'profile21',
                            title:'브랜드그룹 관리',
                            type: 'item',
                            url: '/user/account-profile/profile1'
                        },
                        {
                            id: 'profile22',
                            title: '인사조직-브랜드그룹 관리',
                            type: 'item',
                            url: '/user/account-profile/profile2'
                        }
                    ]
                }                
            ]
        },
        {
            id: 'menu04',
            title: 'SYSTEM',
            type: 'collapse',
            icon: icons.IconUserCheck,
            children: [
                {
                    id: 'account-profile',
                    title: 'In-Season',
                    type: 'collapse',
                    children: [
                        {
                            id: 'profile23',
                            title:'월별매출예상',
                            type: 'item',
                            url: '/user/account-profile/profile1'
                        },
                        {
                            id: 'profile24',
                            title: 'ACC브랜드판매계획',
                            type: 'item',
                            url: '/user/account-profile/profile2'
                        }
                    ]
                }
            ]
        }        
    ]
}; 

export default application;
