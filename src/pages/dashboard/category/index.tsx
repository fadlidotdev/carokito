import {useGetAllCategoryQuery} from "@/api/category";
import {Button, Pagination, TD, TR, Table} from "@/components/common";
import {
  DashboardContent,
  DashboardHeader,
} from "@/components/layouts/DashboardLayout";
import {useRouteMappingPagination, useTotalPage} from "@/hooks/core";
import {routes} from "@/utils/routes";
import Link from "next/link";
import {useRouter} from "next/router";
import {useCallback, useEffect, useState} from "react";
import {toast} from "react-hot-toast";

const columns = ["ID", "Name", "Slug", "Action"];

const ITEMS_PER_PAGE = 10;

export default function Index() {
  const router = useRouter();

  const [currentPage, setCurrentPage] = useState(1);

  const {data, isLoading, error} = useGetAllCategoryQuery({
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
      router.push(routes("dashboard/category/update") + `/${id}`);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return (
    <>
      <DashboardHeader
        title="Category"
        rightContent={
          <Link href={routes("dashboard/category/create")}>
            <Button>Add New</Button>
          </Link>
        }
      />

      <DashboardContent>
        <Table loading={isLoading} columns={columns} className="mb-6">
          {data?.data?.map(({id, name, slug}) => (
            <TR key={id}>
              <TD>{id}</TD>
              <TD>{name}</TD>
              <TD>{slug}</TD>
              <TD>
                <Button
                  variant="alternate"
                  onClick={() => handleClickUpdate(id)}>
                  Edit
                </Button>
              </TD>
            </TR>
          ))}
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
