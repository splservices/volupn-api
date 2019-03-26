import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import * as fs from 'fs';

@Injectable()
export class RenderHTMLMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: Function) {
        //const output = fs.readFileSync(__dirname + '/build/index.html');
        //res.type('html').send(output)
        next()
    }
}