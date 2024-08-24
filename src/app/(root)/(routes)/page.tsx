//C:\AI_src\Companion_UI\SaaS-AI-Companion\src\app\(root)\(routes)\page.tsx

import { Categories } from "@components/categories";
import { Companions } from "@components/companions";
import { SearchInput } from "@components/search-input";
import prisma from "@lib/prismadb";

interface RootPageProps {
    searchParams: {
        categoryId: string;
        name: string;
    }
}

const RootPage = async ({ searchParams }: RootPageProps) => {
    // Ensure searchParams are correctly being passed and utilized

    // Fetch companions based on searchParams
    const data = await prisma.companion.findMany({
        where: {
            categoryId: searchParams.categoryId,
            name: {
                search: searchParams.name
            }
        },
        orderBy: {
            createdAt: "desc",
        },
        include: {
            _count: {
                select: {
                    messages: true
                }
            }
        }
    });

    // Fetch categories
    const categories = await prisma.category.findMany();

    return ( 
        <div className="h-full p-4 space-y-2">
            <SearchInput />
            <Categories data={categories} />
            <Companions data={data} />
        </div>
    );
}

export default RootPage;
