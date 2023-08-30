import {useGetAllPostQuery} from "@/api/post/query";
import {Button, Pagination, TD, TR, Table} from "@/components/common";
import {
  DashboardContent,
  DashboardHeader,
} from "@/components/layouts/DashboardLayout";
import {useRouteMappingPagination, useTotalPage} from "@/hooks/core";
import {routes} from "@/utils/routes";
import {format, setDefaultOptions} from "date-fns";
import {id} from "date-fns/locale";
import Link from "next/link";
import {useRouter} from "next/router";
import {useCallback, useEffect, useState} from "react";
import {toast} from "react-hot-toast";

setDefaultOptions({locale: id});

const columns = [
  "Title",
  "Category",
  "Hashtags",
  "Publish At",
  "Author",
  "Action",
];

const ITEMS_PER_PAGE = 10;

export default function Index() {
  const router = useRouter();

  const [currentPage, setCurrentPage] = useState(1);
  const {data, isLoading, error} = useGetAllPostQuery({
    page: currentPage,
    limit: ITEMS_PER_PAGE,
  });

  useEffect(() => {
    if (error) toast.error(error as string);
  }, [error]);

  const totalPage = useTotalPage(data?.count || 0, ITEMS_PER_PAGE);

  useRouteMappingPagination(currentPage);

  const handleClickUpdate = useCallback(
    (id: number) => {
      router.push(routes("dashboard/post/update") + `/${id}`);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return (
    <>
      <DashboardHeader
        title="Post"
        rightContent={
          <Link href={routes("dashboard/post/create")}>
            <Button>Add New</Button>
          </Link>
        }
      />

      <DashboardContent>
        <Table loading={isLoading} columns={columns} className="mb-6">
          {data?.data?.map(
            ({id, title, created_at, hashtags, admin, category}: any) => (
              <TR key={id}>
                <TD>{title}</TD>
                <TD>{category.name}</TD>
                <TD>
                  {hashtags
                    ?.split(",")
                    .map((h: string) => `#${h}`)
                    .join(" ")}
                </TD>
                <TD>
                  {format(new Date(created_at), "dd MMM yyyy HH:mm:ss") +
                    " WIB"}
                </TD>
                <TD>{admin.name as string}</TD>
                <TD>
                  <Button
                    variant="alternate"
                    onClick={() => handleClickUpdate(id)}>
                    Edit
                  </Button>
                </TD>
              </TR>
            ),
          )}
        </Table>

        <Pagination
          currentPage={currentPage}
          totalPage={totalPage}
          onChange={(page) => setCurrentPage(page)}
        />
      </DashboardContent>
    </>
  );
}
