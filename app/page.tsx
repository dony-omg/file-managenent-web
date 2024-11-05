'use client'

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    BarChart2,
    File,
    FileText,
    Folder,
    FolderUp,
    Grid,
    Home,
    Image as ImageIcon,
    Layout,
    List,
    Lock,
    Notebook,
    Plus,
    Presentation,
    Search,
    Share2,
    SortAsc,
    Table2,
    Trash2,
    Upload,
    Users,
} from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useState } from "react"

type ViewStyle = "list" | "compact" | "tiles"
type SortField = "name" | "modified" | "size"
type SortDirection = "asc" | "desc"

interface FileItem {
    name: string
    modified: string
    size?: string
    type: "folder" | "vault"
}

export default function Component() {
    const [viewStyle, setViewStyle] = useState<ViewStyle>("list")
    const [sortField, setSortField] = useState<SortField>("name")
    const [sortDirection, setSortDirection] = useState<SortDirection>("asc")

    const files: FileItem[] = [
        { name: "Công Ty", modified: "4/3/2024", type: "folder" },
        { name: "Desktop", modified: "7/30/2019", size: "4.82 KB", type: "folder" },
        { name: "Documents", modified: "4/4/2024", type: "folder" },
        { name: "Hình ảnh", modified: "10/12/2012", size: "26.9 MB", type: "folder" },
        { name: "Personal Vault", modified: "10/2/2019", type: "vault" },
    ]

    const sortedFiles = [...files].sort((a, b) => {
        const direction = sortDirection === "asc" ? 1 : -1
        switch (sortField) {
            case "name":
                return a.name.localeCompare(b.name) * direction
            case "modified":
                return new Date(a.modified).getTime() - new Date(b.modified).getTime() * direction
            case "size":
                return ((a.size || "0").localeCompare(b.size || "0")) * direction
            default:
                return 0
        }
    })

    return (
        <div className="flex h-screen flex-col">
            {/* Top Bar */}
            <header className="border-b">
                <div className="flex h-14 items-center px-4 gap-4">
                    <Input
                        className="max-w-[400px]"
                        placeholder="Search everything"
                        type="search"
                    />
                    <div className="ml-auto flex items-center gap-4">
                        <Button size="icon" variant="ghost">
                            <Search className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </header>

            <div className="flex flex-1 overflow-hidden">
                {/* Sidebar */}
                <aside className="w-[240px] border-r bg-muted/40 p-4">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button className="mb-6" variant="secondary">
                                <Plus className="mr-2 h-4 w-4" />
                                New & Upload
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56">
                            <DropdownMenuItem>
                                <Folder className="mr-2 h-4 w-4" /> Folder
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Upload className="mr-2 h-4 w-4" /> Files upload
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <FolderUp className="mr-2 h-4 w-4" /> Folder upload
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <FileText className="mr-2 h-4 w-4" /> Word document
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Table2 className="mr-2 h-4 w-4" /> Excel workbook
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Presentation className="mr-2 h-4 w-4" /> PowerPoint presentation
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Notebook className="mr-2 h-4 w-4" /> OneNote notebook
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <BarChart2 className="mr-2 h-4 w-4" /> Excel survey
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <File className="mr-2 h-4 w-4" /> Text Document
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <nav className="grid gap-2">
                        <Button className="justify-start" variant="ghost">
                            <Home className="mr-2 h-4 w-4" />
                            Home
                        </Button>
                        <Button className="justify-start" variant="ghost">
                            <Folder className="mr-2 h-4 w-4" />
                            My files
                        </Button>
                        <Button className="justify-start" variant="ghost">
                            <ImageIcon className="mr-2 h-4 w-4" />
                            Photos
                        </Button>
                        <Button className="justify-start" variant="ghost">
                            <Share2 className="mr-2 h-4 w-4" />
                            Shared
                        </Button>
                        <Button className="justify-start" variant="ghost">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Recycle bin
                        </Button>
                    </nav>

                    <div className="mt-8">
                        <h2 className="mb-2 px-4 text-sm font-semibold">Browse files by</h2>
                        <nav className="grid gap-2">
                            <Button className="justify-start" variant="ghost">
                                <Users className="mr-2 h-4 w-4" />
                                People
                            </Button>
                        </nav>
                    </div>

                    <div className="mt-auto pt-4">
                        <Card className="p-4">
                            <div className="mb-2 text-sm">Storage</div>
                            <div className="mb-2 text-xs text-muted-foreground">
                                0.1 GB used of 5 GB (1%)
                            </div>
                            <div className="h-2 rounded-full bg-muted">
                                <div className="h-full w-[1%] rounded-full bg-primary" />
                            </div>
                        </Card>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1 overflow-auto">
                    <div className="flex items-center justify-between px-4 py-4 border-b">
                        <h1 className="text-2xl font-semibold">My files</h1>
                        <div className="flex items-center gap-2">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="sm">
                                        <SortAsc className="h-4 w-4 mr-2" />
                                        Sort
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem onClick={() => setSortField("name")}>
                                        Name {sortField === "name" && (sortDirection === "asc" ? "↑" : "↓")}
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => setSortField("modified")}>
                                        Modified {sortField === "modified" && (sortDirection === "asc" ? "↑" : "↓")}
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => setSortField("size")}>
                                        Size {sortField === "size" && (sortDirection === "asc" ? "↑" : "↓")}
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="sm">
                                        {viewStyle === "list" && <List className="h-4 w-4" />}
                                        {viewStyle === "compact" && <Layout className="h-4 w-4" />}
                                        {viewStyle === "tiles" && <Grid className="h-4 w-4" />}
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem onClick={() => setViewStyle("list")}>
                                        <List className="h-4 w-4 mr-2" /> List
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => setViewStyle("compact")}>
                                        <Layout className="h-4 w-4 mr-2" /> Compact List
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => setViewStyle("tiles")}>
                                        <Grid className="h-4 w-4 mr-2" /> Tiles
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>

                    <div className="p-4">
                        {viewStyle === "tiles" ? (
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                                {sortedFiles.map((file) => (
                                    <Card key={file.name} className="p-4">
                                        <div className="flex flex-col items-center text-center gap-2">
                                            {file.type === "folder" ? (
                                                <Folder className="h-8 w-8" />
                                            ) : (
                                                <Lock className="h-8 w-8" />
                                            )}
                                            <div className="font-medium truncate w-full">{file.name}</div>
                                            <div className="text-xs text-muted-foreground">{file.modified}</div>
                                        </div>
                                    </Card>
                                ))}
                            </div>
                        ) : (
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Modified</TableHead>
                                        <TableHead>Size</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {sortedFiles.map((file) => (
                                        <TableRow key={file.name} className={viewStyle === "compact" ? "h-8" : ""}>
                                            <TableCell className="font-medium">
                                                <div className="flex items-center gap-2">
                                                    {file.type === "folder" ? (
                                                        <Folder className="h-4 w-4" />
                                                    ) : (
                                                        <Lock className="h-4 w-4" />
                                                    )}
                                                    {file.name}
                                                </div>
                                            </TableCell>
                                            <TableCell>{file.modified}</TableCell>
                                            <TableCell>{file.size}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        )}
                    </div>
                </main>
            </div>
        </div>
    )
}