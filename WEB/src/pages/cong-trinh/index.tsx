import { useRouter } from 'next/router'
import { useRequireAuth } from 'src/@core/hooks/useRequireAuth'
import { useEffect, useState, useMemo } from 'react'
import Error401 from 'src/pages/401'
import Error404 from 'src/pages/404'
import CongTrinhHoChuaViews from 'src/pages/cong-trinh/views/ho-chua'
import CongTrinhDapDangViews from 'src/pages/cong-trinh/views/dap-dang'
import CongTrinhKenhViews from './views/kenh'
import CongTrinhTramBomViews from './views/tram-bom'

type ComponentMap = {
  [key: string]: {
    [key: string]: () => JSX.Element
  }
}

const CongTrinhPage = () => {
  const router = useRouter()
  const { page, type } = router.query
  const { hasPermission } = useRequireAuth()
  const [hasAccess, setHasAccess] = useState<boolean | null>(null)

  useEffect(() => {
    const checkPermission = async () => {
      const result = await hasPermission(`${router.pathname}/${page}`, 'view')
      setHasAccess(result)
    }
    checkPermission()
  }, [hasPermission, page, router.pathname])

  const components: ComponentMap = useMemo(
    () => ({
      'ho-chua': {
        default: CongTrinhHoChuaViews
      },
      'dap-dang': {
        default: CongTrinhDapDangViews
      },
      'kenh': {
        default: CongTrinhKenhViews
      },
      'tram-bom': {
        default: CongTrinhTramBomViews
      }
    }),
    []
  )

  const typedType = Array.isArray(type) ? type[0] : type
  const typedPage = Array.isArray(page) ? page[0] : page

  const Component =
    typedPage && components[typedPage]
      ? components[typedPage][typedType as string] || components[typedPage].default || <div>Loading...</div>
      : Error404

  if (hasAccess === null) {
    return <div>Loading...</div>
  }

  return hasAccess ? <Component /> : <Error401 />
}

export default CongTrinhPage
