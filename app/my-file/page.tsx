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
import { BarChart2, File, FileText, FolderUp, Notebook, Presentation, Table2, Upload } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function Component() {
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
                            <Image className="mr-2 h-4 w-4" />
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
            </div>
        </div>
    )
}