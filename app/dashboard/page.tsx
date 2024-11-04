import { AppSidebar } from "@/components/app-sidebar"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import {
    Folder,
    Home,
    Image,
    Lock,
    Plus,
    Search,
    Share2,
    Trash2,
    Users,
} from "lucide-react"

export default function Page() {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                    <div className="flex items-center gap-2 px-4">
                        <SidebarTrigger className="-ml-1" />
                        <Separator orientation="vertical" className="mr-2 h-4" />
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem className="hidden md:block">
                                    <BreadcrumbLink href="#">
                                        Building Your Application
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator className="hidden md:block" />
                                <BreadcrumbItem>
                                    <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                </header>
                <main className="flex-1 overflow-auto">
                    <div className="h-full px-4 py-6">
                        <h1 className="mb-4 text-2xl font-semibold">My files</h1>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Modified</TableHead>
                                    <TableHead>Date taken</TableHead>
                                    <TableHead>File size</TableHead>
                                    <TableHead>Sharing</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TableRow>
                                    <TableCell className="font-medium">
                                        <div className="flex items-center gap-2">
                                            <Folder className="h-4 w-4" />
                                            Công Ty
                                        </div>
                                    </TableCell>
                                    <TableCell>4/3/2024</TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                    <TableCell>
                                        <Lock className="h-4 w-4" />
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="font-medium">
                                        <div className="flex items-center gap-2">
                                            <Folder className="h-4 w-4" />
                                            Desktop
                                        </div>
                                    </TableCell>
                                    <TableCell>7/30/2019</TableCell>
                                    <TableCell></TableCell>
                                    <TableCell>4.82 KB</TableCell>
                                    <TableCell>
                                        <Lock className="h-4 w-4" />
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="font-medium">
                                        <div className="flex items-center gap-2">
                                            <Folder className="h-4 w-4" />
                                            Documents
                                        </div>
                                    </TableCell>
                                    <TableCell>4/4/2024</TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                    <TableCell>
                                        <Lock className="h-4 w-4" />
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="font-medium">
                                        <div className="flex items-center gap-2">
                                            <Folder className="h-4 w-4" />
                                            Hình ảnh
                                        </div>
                                    </TableCell>
                                    <TableCell>10/12/2012</TableCell>
                                    <TableCell></TableCell>
                                    <TableCell>26.9 MB</TableCell>
                                    <TableCell>
                                        <Lock className="h-4 w-4" />
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="font-medium">
                                        <div className="flex items-center gap-2">
                                            <Lock className="h-4 w-4" />
                                            Personal Vault
                                        </div>
                                    </TableCell>
                                    <TableCell>10/2/2019</TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                    <TableCell>
                                        <Lock className="h-4 w-4" />
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </div>
                </main>
            </SidebarInset>
        </SidebarProvider>
    )
}
