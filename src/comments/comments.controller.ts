/* eslint-disable @typescript-eslint/no-unsafe-argument */
import {
  Controller,
  Get,
  Post,
  Body,
  // Patch,
  Param,
  Delete,
  Query,
  BadRequestException,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
// import { UpdateCommentDto } from './dto/update-comment.dto';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  create(@Body() createCommentDto: CreateCommentDto) {
    return this.commentsService.create(createCommentDto);
  }

  @Get()
  findAll(@Query() queryParams) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (queryParams.parentId)
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        return this.commentsService.getCommentsByParentId(queryParams.parentId);
    } catch (error) {
      throw new BadRequestException('Something bad happened', {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        cause: new Error(error.message),
        description: 'Some error description',
      });
    }
  }
  @Get('/top')
  findTopLevel() {
    return this.commentsService.getTopLevelComments();
  }
  @Get('/awl')
  findAwl() {
    return this.commentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commentsService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
  //   return this.commentsService.update(+id, updateCommentDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentsService.remove(+id);
  }
}
