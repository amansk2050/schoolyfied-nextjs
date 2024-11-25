import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
 
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function AddClassSectionCard() {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle className="text-xl font-bold">Add Section</CardTitle>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Input id="name" placeholder="Ex: 12 - C" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Select>
                <SelectTrigger id="framework">
                  <SelectValue placeholder="Select Class" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="next">12</SelectItem>
                  <SelectItem value="sveltekit">11</SelectItem>
                  <SelectItem value="astro">10</SelectItem>
                  <SelectItem value="nuxt">9</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button>Add</Button>
      </CardFooter>
    </Card>
  )
}
