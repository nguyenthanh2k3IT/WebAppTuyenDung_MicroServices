import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MoreHorizontal, Plus } from 'lucide-react';
import { projects } from '../../data/dashboard.data';

function Dashboard() {
    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Dashboard</h1>
                <Button size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Project
                </Button>
            </div>
            <div className="flex space-x-4 mb-6">
                <Button variant="outline">
                    All <span className="ml-2 bg-gray-200 text-gray-800 rounded-full px-2">50</span>
                </Button>
                <Button variant="outline">
                    Started <span className="ml-2 bg-gray-200 text-gray-800 rounded-full px-2">20</span>
                </Button>
                <Button variant="outline">
                    Approval <span className="ml-2 bg-gray-200 text-gray-800 rounded-full px-2">15</span>
                </Button>
                <Button variant="outline">
                    Completed <span className="ml-2 bg-gray-200 text-gray-800 rounded-full px-2">34</span>
                </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {projects.map((project, index) => (
                    <Card key={index}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                <span
                                    className={`inline-block w-8 h-8 rounded-full ${project.color} text-white text-center leading-8 mr-2`}
                                >
                                    {project.icon}
                                </span>
                                {project.title}
                            </CardTitle>
                            <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </CardHeader>
                        <CardContent>
                            <div className="text-xs text-muted-foreground">{project.team}</div>
                            <div className="text-xs text-muted-foreground">{project.timeLeft}</div>
                            <div className="flex justify-between items-center mt-4">
                                <div className="flex -space-x-2">
                                    {project.members.map((member, i) => (
                                        <Avatar key={i} className="w-6 h-6 border-2 border-white">
                                            <AvatarImage src={member} />
                                            <AvatarFallback>U</AvatarFallback>
                                        </Avatar>
                                    ))}
                                </div>
                                <div className="text-sm font-medium">{project.progress}%</div>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                                <div
                                    className="bg-blue-600 h-2.5 rounded-full"
                                    style={{ width: `${project.progress}%` }}
                                ></div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}

export default Dashboard;
