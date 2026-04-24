import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/Table";

const meta = {
  title: "Bricks/Table",
  component: Table,
  tags: ["autodocs"],
  args: {
    size: "default" as const,
  },
  argTypes: {
    size: {
      control: "select",
      options: ["default", "md", "lg"],
    },
  },
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

const headLabels = ["Head Text", "Head Text", "Head Text", "Head Text", "Head Text"];

function FigmaTable({ size = "default" as const }: { size?: "default" | "md" | "lg" }) {
  return (
    <div className="w-full max-w-4xl overflow-x-auto">
      <Table size={size}>
        <TableHeader>
          <TableRow>
            {headLabels.map((label, i) => (
              <TableHead key={`h-${i}`} text={label} rightTextAlign={i === headLabels.length - 1} />
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 5 }, (_, row) => (
            <TableRow key={row}>
              <TableCell boldText showDescription={false} text="Table Cell Text" />
              <TableCell text="Table Cell Text" />
              <TableCell text="Table Cell Text" />
              <TableCell text="Table Cell Text" />
              <TableCell rightTextAlign text="Table Cell Text" />
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell
              colSpan={4}
              className="bg-transparent"
              lastRow
              text="Total"
            />
            <TableCell className="bg-transparent" lastRow rightTextAlign>
              <p className="w-full truncate text-right text-sm font-semibold leading-5 text-foreground">
                Table Cell Text
              </p>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}

export const Default: Story = {
  render: (args) => <FigmaTable size={args.size} />,
};

export const SizeMd: Story = {
  args: { size: "md" },
  render: (args) => <FigmaTable size={args.size} />,
};

export const SizeLg: Story = {
  args: { size: "lg" },
  render: (args) => <FigmaTable size={args.size} />,
};

/**
 * Figma `Table` (501:80592): `Size=default` | `Size=md` | `Size=lg` — same structure, row density only.
 */
export const AllSizes: Story = {
  render: () => (
    <div className="flex w-full max-w-5xl flex-col gap-12 font-body text-foreground">
      <div>
        <p className="mb-3 text-xs font-medium text-muted-foreground">Size: default</p>
        <FigmaTable size="default" />
      </div>
      <div>
        <p className="mb-3 text-xs font-medium text-muted-foreground">Size: md</p>
        <FigmaTable size="md" />
      </div>
      <div>
        <p className="mb-3 text-xs font-medium text-muted-foreground">Size: lg</p>
        <FigmaTable size="lg" />
      </div>
    </div>
  ),
};
