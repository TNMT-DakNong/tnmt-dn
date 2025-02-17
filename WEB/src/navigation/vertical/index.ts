// ** Icon imports
import HomeOutline from 'mdi-material-ui/HomeOutline'
import AccountCogOutline from 'mdi-material-ui/AccountCogOutline'

// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'
import { ArrowBack, PeopleAltOutlined, Tv } from '@mui/icons-material'

const navigation = (router: any): VerticalNavItemsType => {
  const basePaths = {
    admin: '/quan-tri',
    cong_trinh: '/cong-trinh'
  }

  const routes = {
    admin: [
      {
        title: 'Trang chủ',
        icon: HomeOutline,
        path: '/'
      },
      {
        title: 'Quản lý',
        children: [
          {
            title: 'Người dùng',
            icon: AccountCogOutline,
            path: `${basePaths.admin}/he-thong/nguoi-dung`
          },
          {
            title: 'Vai trò người dùng',
            icon: PeopleAltOutlined,
            path: `${basePaths.admin}/he-thong/nhom-nguoi-dung`
          },
          {
            title: 'Trang truy cập',
            icon: Tv,
            path: `${basePaths.admin}/he-thong/trang-truy-cap`
          }
        ]
      },
      {
        title: 'Phân quyền',
        children: [
          {
            title: 'Người dùng',
            icon: AccountCogOutline,
            path: `${basePaths.admin}/phan-quyen/nguoi-dung`
          },
          {
            title: 'Vai trò người dùng',
            icon: PeopleAltOutlined,
            path: `${basePaths.admin}/phan-quyen/nhom-nguoi-dung`
          }
        ]
      }
    ],
    baseRouter: [
      {
        title: 'QUẢN LÝ HỆ THỐNG TƯỚI',
        icon: ArrowBack,
        path: basePaths.cong_trinh
      },

      {
        title: 'Công trình',
        children: [
          {
            title: 'Hồ chứa',
            path: `${basePaths.cong_trinh}?page=ho-chua`
          },
          {
            title: 'Đập dâng',
            path: `${basePaths.cong_trinh}?page=dap-dang`
          },
          {
            title: 'Cống  ',
            path: `${basePaths.cong_trinh}?page=cong`
          },
          {
            title: 'Trạm bơm  ',
            path: `${basePaths.cong_trinh}?page=tram-boom`
          },
          {
            title: 'Kênh ',
            path: `${basePaths.cong_trinh}?page=kenh`
          },
          {
            title: 'Công trình khác ',
            path: `${basePaths.cong_trinh}?page=khac`
          }
        ]
      },

      {
        title: 'Dữ liệu vùng tưới',
        children: [
          {
            title: 'Lúa',
            path: `${basePaths.cong_trinh}?page=thong-so-ho-chua&type=thong-so`
          },
          {
            title: 'Cây công nghiệp ngắn ngày',
            path: `${basePaths.cong_trinh}?page=thong-so-ho-chua&type=quan-he-zvf`
          },
          {
            title: 'Cây công nghiệp dài ngày ',
            path: `${basePaths.cong_trinh}?page=thong-so-ho-chua&type=quy-dinh-MNVH`
          },
          {
            title: 'Nuôi trồng thủy sản ',
            path: `${basePaths.cong_trinh}?page=thong-so-ho-chua&type=quy-dinh-MNVH`
          },
          {
            title: 'Loại khác ',
            path: `${basePaths.cong_trinh}?page=thong-so-ho-chua&type=quy-dinh-MNVH`
          }
        ]
      },

      {
        title: 'Quan trắc, vận hành',
        children: [
          {
            title: 'Hồ chứa',
            path: `${basePaths.cong_trinh}?page=thong-so-ho-chua&type=thong-so`
          },
          {
            title: 'Lượng mưa',
            path: `${basePaths.cong_trinh}?page=thong-so-ho-chua&type=quan-he-zvf`
          },
          {
            title: 'Mực nước ',
            path: `${basePaths.cong_trinh}?page=thong-so-ho-chua&type=quy-dinh-MNVH`
          }
        ]
      },

      {
        title: 'Dữ liệu dự báo',
        children: [
          {
            title: 'Mưa',
            path: `${basePaths.cong_trinh}?page=thong-so-ho-chua&type=thong-so`
          },
          {
            title: 'Nguồn nước đến hồ',
            path: `${basePaths.cong_trinh}?page=thong-so-ho-chua&type=quan-he-zvf`
          },
          {
            title: 'Mực nước',
            path: `${basePaths.cong_trinh}?page=thong-so-ho-chua&type=quy-dinh-MNVH`
          }
        ]
      },
      {
        title: 'Nhu cầu sử dụng nước',
        children: [
          {
            title: 'Quản lý mùa vụ',
            path: `${basePaths.cong_trinh}?page=thong-so-ho-chua&type=thong-so`
          },
          {
            title: 'Danh mục cây trồng',
            path: `${basePaths.cong_trinh}?page=thong-so-ho-chua&type=quan-he-zvf`
          },
          {
            title: 'Kế hoạch cấp nước',
            path: `${basePaths.cong_trinh}?page=thong-so-ho-chua&type=quy-dinh-MNVH`
          },
          {
            title: 'Nhu cầu sử dụng nước',
            path: `${basePaths.cong_trinh}?page=thong-so-ho-chua&type=quy-dinh-MNVH`
          }
        ]
      },
      {
        title: 'Cân bằng nước',
        children: [
          {
            title: 'Hệ thống tưới thiếu nước',
            path: `${basePaths.cong_trinh}?page=thong-so-ho-chua&type=thong-so`
          },
          {
            title: 'Hệ thống tưới đủ nước',
            path: `${basePaths.cong_trinh}?page=thong-so-ho-chua&type=quan-he-zvf`
          }
        ]
      },
      {
        title: 'Tổng hợp hệ thống tưới',
        children: [
          {
            title: 'Khả năng cấp nước HC',
            path: `${basePaths.cong_trinh}?page=thong-so-ho-chua&type=thong-so`
          },
          {
            title: 'Cơ cấu cây trồng theo mùa vụ',
            path: `${basePaths.cong_trinh}?page=thong-so-ho-chua&type=quan-he-zvf`
          },
          {
            title: 'Cân bằng nước theo hồ chứa',
            path: `${basePaths.cong_trinh}?page=thong-so-ho-chua&type=quan-he-zvf`
          }
        ]
      },

      {
        title: 'Thông báo - cảnh báo',
        children: [
          {
            title: 'Thông báo',
            path: `${basePaths.cong_trinh}/thong-bao`
          },
          {
            title: 'Cảnh báo',
            path: `${basePaths.cong_trinh}/canh-bao`
          }
        ]
      },

      {
        title: 'Hướng dẫn sử dụng',
        path: '/pdf/huongdansudung_TNN.pdf'
      }
    ]
  }

  //quan tri
  if (router.pathname.includes('quan-tri')) {
    return routes.admin
  }

  // Default return
  return routes.baseRouter
}

export default navigation
