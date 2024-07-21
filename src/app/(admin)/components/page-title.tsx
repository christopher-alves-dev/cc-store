import { Badge } from "@/components/ui/badge";
import {
  LayoutDashboardIcon,
  ListOrderedIcon,
  PackageIcon,
  PackageSearchIcon,
} from "lucide-react";
import { usePathname } from "next/navigation";

export const PageTitle = () => {
  const pathname = usePathname();

  const options = {
    ["/dashboard"]: {
      Icon: LayoutDashboardIcon,
      title: "Dashboard",
    },
    ["/dashboard/products"]: {
      Icon: PackageIcon,
      title: "Produtos",
    },
    ["/dashboard/categories"]: {
      Icon: ListOrderedIcon,
      title: "Categorias",
    },
    ["/dashboard/orders"]: {
      Icon: PackageSearchIcon,
      title: "Pedidos",
    },
  };

  const { Icon, title } = options[pathname as keyof typeof options];

  return (
    <Badge variant="heading">
      <Icon size={18} />
      {title}
    </Badge>
  );
};
