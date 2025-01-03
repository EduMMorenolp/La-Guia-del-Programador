// swagger/v1/paths/videos/deleteVideo.js

const deleteVideo = {
    summary: 'Elimina un video por ID',
    description: 'Este endpoint elimina un video basado en su ID.',
    tags: ['Videos'],
    security: [
        {
            bearerAuth: []
        }
    ],
    parameters: [
        {
            name: 'videoId',
            in: 'path',
            description: 'ID del video a eliminar',
            required: true,
            schema: {
                type: 'string',
                example: 4
            }
        }
    ],
    responses: {
        204: {
            description: 'Video eliminado exitosamente'
        },
        404: {
            description: 'Video no encontrado'
        }
    }
};

export default deleteVideo;
