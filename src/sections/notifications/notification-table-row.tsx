import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import MenuList from '@mui/material/MenuList';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import MenuItem, { menuItemClasses } from '@mui/material/MenuItem';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

export type NotificationProps = {
  id: number;
  Notificationid: string;
  imageurl: string;
  iconurl: string;
  title: string;
  description: string;
  category: string;
  acreprice: number;
  plotprice: number;
  treeprice: number;
  numberoftrees: number;
  quantityavailable: number;
  gestationperiod: string;
  maturationperiod: string,
  roi: string,
  location: string,
  status: string,
  created_by: string,
  updated_by: string | null,
  created_at: string,
  updated_at: string,


  id = models.AutoField(primary_key = True,unique=True)
    user =  models.ForeignKey(User, on_delete=models.CASCADE, related_name='chatmessagesent')
    title = models.CharField(max_length=255)
    message = models.TextField()
    priority = models.IntegerField(default=0)
    message_type = models.CharField(max_length=50, default='general')  # e.g., general, alert, reminder
    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
       
};

type NotificationTableRowProps = {
  row: NotificationProps;
  selected: boolean;
  onSelectRow: () => void;
};

export function NotificationTableRow({ row, selected, onSelectRow }: NotificationTableRowProps) {
  const [openPopover, setOpenPopover] = useState<HTMLButtonElement | null>(null);
//console.log(row)
  const handleOpenPopover = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    setOpenPopover(event.currentTarget);
  }, []);

  const handleClosePopover = useCallback(() => {
    setOpenPopover(null);
  }, []);

  return (
    
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={onSelectRow} />
        </TableCell>

        <TableCell component="th" scope="row">
          <Box
            sx={{
              gap: 2,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Avatar alt={row.title} src={row.imageurl} />
            {row.title}
          </Box>
        </TableCell>

        <TableCell>{row.acreprice}</TableCell>

        <TableCell>{row.plotprice}</TableCell>
            
            <TableCell>{row.treeprice}</TableCell>

      <TableCell>{row.roi}</TableCell>

       <TableCell>{row.quantityavailable}</TableCell>
           
        

        <TableCell align="right">
          <IconButton onClick={handleOpenPopover}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <Popover
        open={!!openPopover}
        anchorEl={openPopover}
        onClose={handleClosePopover}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuList
          disablePadding
          sx={{
            p: 0.5,
            gap: 0.5,
            width: 140,
            display: 'flex',
            flexDirection: 'column',
            [`& .${menuItemClasses.root}`]: {
              px: 1,
              gap: 2,
              borderRadius: 0.75,
              [`&.${menuItemClasses.selected}`]: { bgcolor: 'action.selected' },
            },
          }}
        >
          <MenuItem onClick={handleClosePopover}>
            <Iconify icon="solar:pen-bold" />
            Edit
          </MenuItem>

          <MenuItem onClick={handleClosePopover} sx={{ color: 'error.main' }}>
            <Iconify icon="solar:trash-bin-trash-bold" />
            Delete
          </MenuItem>
        </MenuList>
      </Popover>
    </>
  );
}
